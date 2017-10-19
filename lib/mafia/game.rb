# coding: utf-8
module Game
  
  require 'time'
  require 'date'
  Max_Wait=30
  EventHash={}
  module Enums
    Gender=[:male,:female]
    
  end
  EventList={}
  require_relative 'groups'
  require_relative 'events/event'
  require_relative 'events/announce.rb'
  require_relative 'events/enter_location.rb'
  require_relative 'events/say_something'
  require_relative 'events/bet_something'
  require_relative 'events/bet_something_better'
  require_relative 'events/notification'
  require_relative 'events/message_to_group'

  #  require_relative 'locations/location'
  require_relative 'locations/casino'
  
  
  
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
      locations=[]
      #resources={}
      tasks={}
      if (time == :login) then
        $client[:events].find.each do |event|
          if Groups.is_member(self,event[:visible]) then; events << event ;end
        end
        tasks=@tasks
        Game::Locations::LocationHash.each do |hash,desc|
          o=desc.clone
          o[:hash]=hash
          o.delete(:mod)
          o.delete(:timeout)
          o[:inside]=Groups.is_member(self,o[:group])
          o[:insides]=Groups.all_members(o[:group])
          locations << o
        end
        
      else
        
        #      puts "info setting new "+@user
        Database.events_later_than(time).each do |event|
          if Groups.is_member(self,event[:visible]) then; events << event ;end
        end
        Game::Locations::LocationHash.each do |hash,desc|
          if (desc[:last_update]> time) then
            o=desc.clone
            o[:hash]=hash
            o.delete(:mod)
            o.delete(:timeout)
            o[:inside]=Groups.is_member(self,o[:group])
            o[:insides]=Groups.all_members(o[:group])
            locations << o
          end
        end
        
        $log.debug("#{__FILE__}#{__LINE__} updated locations: #{locations}")
        
        @tasks.each do |id,task|
          if (task[:time] > time) then
            tasks[id]=task
            #  tasks[id][:id]=id
          end
        end
        #     puts events
        #     puts time.to_s
      end
      #  puts "resources: "+ @resources.to_s
      
      info={events: events,resources: @resources,tasks: tasks,locations: locations,groups: Groups.all_groups(self)}
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
        time=Time.new
        kill_list=[]
        Game::Login.by_user.keys.each do |user|
          if (time-Game::Login.by_user[user].last_check_time > Max_Wait) then
            kill_list << user
          end
        end
        kill_list.each do |user|
          Game::Login.by_user.delete(user)
          $log.debug("#{__FILE__} , #{__LINE__} user #{user} logged out")
        end
      end
    end
    
    def self.every_second iter
      Login.prune_users

      EventList.each do |id,event|
        if event.respond_to? :by_god then
          event.by_god iter
        end
      end
      
    end
  end
end
