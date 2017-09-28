module Server
  module Enum
    Login={}
    Login[:invalid_user_or_pass]=0
    Login[:already_logged_in]=2
    Login[:authenticated]=1

    Update={}
    Update[:not_logged_in]=0
    Update[:logged_in]=1
    Update[:expired]=-1
    Update[:incomplete]=-2
    Update[:contradictory]=-3
    Update[:invalid_event]=-4
  end
App=Sinatra::Application
App.set :port, 3000
App.set :environment, :production
App.set :public_folder, "./public"

App.get '/hello' do
  "<h1> Hello world! </h1>"
end

App.post '/login' do
  #code: 0 ,login failed- code:1 ,login succeeded, code:2 already logged in
  #jdata = JSON.parse(params[:username],:symbolize_names => true)
  data=JSON.parse(request.body.read,:symbolize_names => true)
  query=$client[:players].find user: data[:user],pass: data[:pass]
  if (query.count==0) then
    puts "no such user"
    res={success: false,message: "no such user",code: Enum::Login[:invalid_user_or_pass]}
    res.to_json
  else
    user=query.first[:user]
    if Game::Login.by_user.key? user then
      puts query.first[:name]+ " has new interface"
      tocken=Game::Login.by_user[user].tocken
      res={success: true,message: "Authenticated,you already had a tocken",tocken: tocken,code: Enum::Login[:already_logged_in] }
      return res.to_json
      
    end
    puts query.first[:name]+"  logged in"
    new_user=Game::Login.new(data[:user])
    res={success: true,message: "Authenticated",tocken: new_user.tocken,code: Enum::Login[:authenticated] }
    #res[:info]=Game::Player.players[new_user.user].login_info
    res.to_json
  end
  
end
App.post '/loginInfo' do
  data=JSON.parse(request.body.read,:symbolize_names => true)
  if Game::Login.by_tocken.key? data[:tocken] then
    user_login=Game::Login.by_tocken[data[:tocken]]
    user_login.check
    res={}
    res[:info]=user_login.player.info
    res[:code]=Enum::Update[:logged_in]
    puts "LoginInfo "+res.to_s
  else
    res[:code]=Enum::Update[:expired]
  end
  res.to_json
end
App.post '/update' do
  #code: 0 not logged in code:1 logged in code:-1 login expired
  online=[]
  code=Enum::Update[:not_logged_in]
  #time=Time.new
  Game::Login.by_user.keys.each do |user|
    o={}
    puts "user is "+user.to_s
   
    puts Game::Player.players[user]
    o[:user]=user.to_s
    o[:name]=Game::Player.players[user].name
    o[:gender]=Game::Player.players[user].gender
    online.push(o)
  end
  puts online
  
  data=JSON.parse(request.body.read,:symbolize_names => true)
  puts "update Data: "+data.to_s
  res={code: code,online: online}
  if data.key? :tocken
    unless Game::Login.by_tocken.key? data[:tocken]
      code=Enum::Update[:expired]
      res={code: code,online: online}
      return res.to_json
    else
      code=Enum::Update[:logged_in]
      res={online: online,code: code}
      user_login=Game::Login.by_tocken[data[:tocken]]
      new_events=Database.events_later_than(user_login.last_check_time)
      res[:info]=user_login.player.info user_login.last_check_time
      Game::Login.by_tocken[data[:tocken]].check
    end
  end
  
  res.to_json
end

App.post '/register_event' do
  res={}
  puts "register event requusted" 
  data=JSON.parse(request.body.read,:symbolize_names => true)
  puts data
  unless (data.key? :tocken and data.key? :hash and data.key? :data) then
    res[:code]=Enum::Update[:incomplete]
    return res.to_json
  end 
    
  unless Game::Login.by_tocken.key? data[:tocken] then
    res[:code]=Enum::Update[:expired]
    return  res.to_json
  end
  user_login=Game::Login.by_tocken[data[:tocken]]
  
#  case data[:hash]
#  when"saySomething" 
#      puts "Event saySomething"
#      unless user_login.player==Game::Player.players[data[:data][:a]]
#           res[:code]=Enum::Update[:contradictory]
#           puts "incorrect user"
#           return res.to_json
#      end
     
  event=Game::EventHash[data[:hash]]
  o=data[:data]
  puts o
  o[:author]=user_login.user
  unless event.condition o then
    res[:code]=Enum::Update[:invalid_event]
    return res.to_json
  end
  puts o
  e=event.new o,:commit
  puts e 
  puts "valid request"
  "request is valid"
end

App.post '/update_event' do
  res={}
  puts "update event requested" 
  data=JSON.parse(request.body.read,:symbolize_names => true)
  puts data
  unless (data.key? :tocken and data.key? :info and data.key? :method) then
    res[:code]=Enum::Update[:incomplete]
    return res.to_json
  end 
    
  unless Game::Login.by_tocken.key? data[:tocken] then
    res[:code]=Enum::Update[:expired]
    return  res.to_json
  end
  user_login=Game::Login.by_tocken[data[:tocken]]
  event=Game::EventList[data[:id]]
  if (not event.respond_to? data[:method]) then
    res[:code]=Enum::Update[:invalid_event]
    return res.to_json
  end
  res[:message]=event.send(data[:method].to_sym,user: user_login.user,info: data[:info])
  res[:code]=Enum::Update[:logged_in]
  res.to_json
end
#    res[:code]=Enum::Update[:logged_in]
#    puts "LoginInfo "+res.to_s
#  else
#    res[:code]=Enum::Update[:expired]
#  end
#  res.to_json
#end
#end
end
