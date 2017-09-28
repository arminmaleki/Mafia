module Game
  
  require 'time'
  require 'date'
  Max_Wait=30
  EventHash={}
  module Enums
    Gender=[:male,:female]
    
  end
  EventList={}
  class Event
    def self.requirements; {}; end
    def self.optionals; {}; end
    def self.stateless; false; end
    def self.hash; "default"; end
    attr_reader :options,:id;
    def self.condition(o,child_self=Event)
       unless all_keys?(o,child_self) then return false end
      true
    end
    def initialize(o,commit,child_self=Event)
      @options=o;
      #@@event_list.push(self) unless @@stateless
      
      
      if (commit == :commit) then
        @id=SecureRandom.base64
        o[:hash]=child_self.hash
        puts "initialize Event, child_self.hash is "+child_self.hash
      o[:time_stamp]=DateTime.parse(Time.new.to_s)
      
      o[:last_update]=o[:time_stamp]
      
      o[:closed]= child_self.stateless
      o[:id]=@id
      #if (not @@stateless) then Database.put_event(o) end
      puts "putting "+child_self.hash+" in data-base "+o.to_s
      res=$client[:events].insert_one(o)
      else
        @id=o[:id]
      end
      @time_stamp=o[:time_stamp]
      @last_update=o[:last_update]
      EventList[@id]=self unless child_self.stateless
    end
    def self.all_keys?(o,child_self)
       all_parameters=true
       child_self.requirements.keys.each do |key|
        puts key
        unless o.key?(key) then
          all_parameters=false
          puts "Event not valid:no parameter "+key.to_s
          break
        end
        if (child_self.requirements[key]=='user' and not Game::Player.players.key?(o[key])) then
          all_parameters=false
          puts "Event not valid: parameter is not a valid user "+key.to_s
          break
        end
      end
    
      all_parameters
    end
  end
  class SaySomething < Event
     def self.requirements; {a: 'user',b: 'user', thing: 'string'}; end
    def self.stateless; true; end
    def self.hash; "saySomething"; end
    EventHash[self.hash]=self
    
   
    
   
    def initialize(o,commit,child_self=SaySomething)
      puts "initialized SaySomething"
      super(o,commit,child_self)
     
      
    end
    
    def self.condition(o,child_self=SaySomething)
      unless (Event.condition(o,child_self)) then ; return false; end
     
      unless o[:author]=o[:a] or o[:author]="God" then
        puts child_self.hash+" not authorized"
        return false
      end
     # unless Player.players.key?(o[:a]) and Player.players.key?(o[:b]) then return false end
      
      true
    end
  end
  class BetSomething < SaySomething

    def self.requirements; o=SaySomething.requirements.clone; o[:thing]="number"; o end
    def self.stateless; false; end
    def self.hash; "betSomething"; end
     EventHash[self.hash]=self

    def initialize(o,commit,child_self=BetSomething)
      
     
      super(o,commit,child_self)
       Player.players[o[:b]].add_task @id,{id: @id,name: child_self.hash,stage: 0, a: o[:a], thing: o[:thing].to_i}
    end
    def self.condition(o,child_self=BetSomething)
      unless (SaySomething.condition(o,child_self)) then ; return false; end
      true
    end
    def accept(o)
      puts "BetSomething accept"
      puts o[:user]
      puts o[:info]
      coin=Random.rand(2)
      if (coin ==1) then
        message="you won "+@options[:thing].to_s
        money=@options[:thing].to_i
      else
         message="you lost "+@options[:thing].to_s
        money=-@options[:thing].to_i
      end
      puts  "BetSomething says: "+message.to_s
      Player.players[@options[:b]].resources[:money]+=money
      Player.players[@options[:a]].resources[:money]-=money
      
      finally
      
      
      "you accepted"+message
    end
    def reject()
    end
    def expire(time)
    end
    def finally
      Player.players[@options[:b]].remove_task @id
      EventList.delete @id
      Database::close_event(@id)
    end
  end


class Player
  attr_reader :is_real,:name,:user,:age,:gender,:history
  attr_accessor :resources
#  include Enums
  @@total=0
  @@players={}
  def self.players
    @@players
  end
  def initialize(o={})
     
    @is_real=o[:is_real]
    @name=o[:name]
    @age=o[:age].to_i
    o[:gender]=o[:gender].to_sym
    if Enums::Gender.include? o[:gender] then
      @gender=o[:gender]
    else
      puts "Undefined Gender for Player "+@name
    end
    @history={}
    @user=o[:user].to_s
    @resources=o[:resources]
    @tasks={}
    @@players[@user]=self
    @@total+=1
  end
  def self.total
    @@total
  end
  def to_s
    "Class Player ,"+"Name: "+ @name + "," +
      "Id: "+ @user.to_s + "," +
      "Gender: "+ @gender.to_s+"\n" 
  end
  def info(time=:login)
    events=[]
    #resources={}
    tasks={}
    if (time == :login) then
    $client[:events].find.each do |event|
      events << event
    end
    tasks=@tasks
    else
   
      puts "info setting new "+@user
      events=Database.events_later_than(time)
      @tasks.each do |id,task|
        if (task[:time] > time) then
          tasks[id]=task
        #  tasks[id][:id]=id
        end
      end
      puts events
      puts time.to_s
    end
    puts "resources: "+ @resources.to_s  
    info={events: events,resources: @resources,tasks: tasks}
    info
  end
  def add_task(id,o)
    o[:time]=Time.now
    @tasks[id]=o
    puts "Task Added for "+@user+"  described as "+id.to_s+"  "+o.to_s 
  end
  def remove_task(id)
    @tasks.delete id
  end
end
#class ::Time
#  def to_s
#    self.strftime("%Y-%m-%d %H:%M:%S")
#  end
#end
class Login
  @@by_tocken={}
  @@by_user={}
  
  def self.by_tocken
    @@by_tocken
  end
  def self.by_user
    @@by_user
  end

  attr_reader :last_check_time,:login_time,:user,:tocken,:player
  def initialize(user)
    @tocken=SecureRandom.base64
    @user=user.to_s
    @player=Player.players[@user]
    @login_time=Time.new
    @last_check_time=@login_time
    
    
    @@by_tocken[@tocken]=self
    @@by_user[user.to_s]=self
    
  end
  def check
    @last_check_time=Time.new
    #puts @user+" "+@last_check_time.to_s

  end
end
module God
  module Login
    def self.prune_users
      #puts Game::Login.by_user.keys
      #puts "Prune:"+Game::Login.by_user.keys.to_s
      time=Time.new
      kill_list=[]
      Game::Login.by_user.keys.each do |user|
        #puts user+" "+(time-Game::Login.by_user[user].last_check_time).to_s
        if (time-Game::Login.by_user[user].last_check_time > Max_Wait) then
          kill_list << user
          #puts "user "+user+" registered for logg out"
        end
      end
      kill_list.each do |user|
        Game::Login.by_user.delete(user)
        puts "user "+user+"logged out"
      end
    end
  end
  def self.every_second
    Login.prune_users
    
  end
end
end
