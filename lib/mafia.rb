# coding: utf-8
require 'mongo'
require 'json'
require 'time'
require 'sinatra'
require 'logger'

$log=Logger.new('mafia.log')

require_relative 'mafia/game'
require_relative 'mafia/database'
#Database.test_db
Database.populate
Database.load_open_events
#puts Game::Player.players;
#puts Game::Player.players["armin"]
o={b:'armin',a:'hanna',thing:'10'}
#puts Game::BetSomething.condition(o)
#Game::BetSomething.new(o,:commit)
#Game::SaySomething.new(o)
#Game::EventHash["saySomething"].new(o)
#puts Game::Player.players["armin"].info
#t=Time.parse( "2017-09-27 04:24:14")
#puts t
#puts Database.events_later_than(t)
#puts Database.events_later_than(Time.now)

#o={to:'armin',message:'دالللیییی',auth:'God'}
#Game::Notification.new(o,:commit)
#o={message:"آفرین صد آفرین" ,visible: ["armin"]}
#Game::Announce.new(o,:commit)
o={user: "armin",  location: "casino"}
puts "Enter Location condition:"+Game::EnterLocation.condition(o).to_s
#Game::EnterLocation.new(o,:commit)
#Game::GodNewJobFiruze.new({user:"armin"}, :commit)

$log.debug("#{__FILE__} , #{__LINE__} total open events: #{Game::EventList.size}");
def start_God
  iter=0
 
   loop do 
      iter+=1
    
    Game::God.every_second iter
    sleep 1
    
    end

end

require_relative 'mafia/server.rb'
Thread.abort_on_exception=true
module Run 
GodThread=Thread.new do
  puts "Here is God!!!"
start_God
end
 
end
 #Server::App.run!

#start_game.call
