# coding: utf-8
module Game
  
  require 'time'
  require 'date'
  Max_Wait=30
  EventHash={}
  JobEvents=[]
  module Enums
    Gender=[:male,:female]
    
  end
  EventList={}
  require_relative 'god'
  require_relative 'groups'
  require_relative 'events/event'
  require_relative 'events/announce.rb'
  require_relative 'events/enter_location.rb'
  require_relative 'events/say_something'
  require_relative 'events/bet_something'
  require_relative 'events/bet_something_better'
  require_relative 'events/notification'
  require_relative 'events/message_to_group'
  require_relative 'events/god_new_job'
  require_relative 'events/god_new_job_firuze'
  require_relative 'events/god_new_job_shagholam'
  require_relative 'events/god_dungeon_choke'

  #  require_relative 'locations/location'
  require_relative 'locations/casino'
  require_relative 'locations/dungeon'
  require_relative 'locations/zoor'
  
  
  
  class Player
    attr_reader :is_real,:name,:user,:age,:gender,:history,:tasks
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
    def info(login=:login)
      events=[]
      locations=[]
      #resources={}
      tasks={}
      if (login == :login) then
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
        time=login.last_check_time
        #      puts "info setting new "+@user
        Database.events_later_than(time).each do |event|
          if Groups.is_member(self,event[:visible]) then; events << event ;end
        end
        diff_group=Groups.all_groups(self)-login.groups
        puts "diff_group: #{diff_group}"
        if (diff_group.size>0) then
          #binding.pry
          puts "there is a new group"
          $client[:events].find.each do |event|
            eshterak=event[:visible]-(event[:visible]-diff_group)
            
            if eshterak.size>0 then; events << event ;end
          end
          
        end
        login.groups=Groups.all_groups(self)
        puts "login.groups #{login.groups}"

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
        
        if (locations.size >0 ) then
          $log.debug("#{__FILE__}#{__LINE__} updated locations: #{locations}")
        end
        
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
    attr_accessor :groups
    def initialize(user)
      @tocken=SecureRandom.base64
      @user=user.to_s
      @player=Player.players[@user]
      @login_time=Time.new
      @last_check_time=@login_time
      @groups=Groups.all_groups @player
      
      @@by_tocken[@tocken]=self
      @@by_user[user.to_s]=self
      
    end
    def check
      @last_check_time=Time.new
      #puts @user+" "+@last_check_time.to_s

    end
  end
end
