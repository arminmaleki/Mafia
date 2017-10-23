# coding: utf-8
module Game
  class GodDungeonChoke < Event
    def self.requirements; [user: 'user'] end
    def self.stateless; false; end
    def self.hash; "godDungeonchoke"; end
    def self.visible(o); []; end
   
     Game::EventHash[self.hash]=self
     class << self
       attr_accessor :waiting
     end
     self.waiting=[]
    def initialize(o,commit,child_self=GodDungeonChoke)
      o[:accepted]="not yet"
      $log.debug("#{__FILE__} , #{__LINE__} initialized GodDungeonChoke")
      
      super(o,commit,child_self)
      message="<img src='img/casper1.jpg' style='width:100px; margin:15px; position:relative; float:left;margin-top:0px;'></img>"
      message+="زالی کنار حوض نشسته می بینید. مقامات دستور دادند او را خفه کنید. در  آمد ۵۰"
   
      Game::Player.players[o[:user]]
        .add_task @id,{id: @id,name: "binary",message: message}
      GodDungeonChoke.waiting << @options[:user]
      
    end

    def self.condition(o,child_self=GodDungeonChoke)
      cond=Event.condition(o,child_self)
      
      cond
    end
    def accept(o,child_self=GodDungeonChoke)
     
      #puts child_self.job_name
      notif="<img src='img/choke.jpg' style='width:100px; margin:15px; position:relative; float:left;margin-top:0px;'></img>"

      notif+="شما زال را به دستور مقامات خفه کردید"
  
    
      Notification.new({to: @options[:user],message: notif,auth:"GodDungeonChoke#accept"},:commit)
      
      announce="<span class='user_span'>#{@options[:user]}</span> "
      announce+= "زالی را به دستور مقامات تاریکخانه خفه کرد"
      Announce.new({message: announce,visible:[":all"]},:commit)
      Player.players[@options[:user]].resources[:money]+=50
     
      @options[:accepted]="yes"
      Game::Player.players[@options[:user]].remove_task @id
      Database.update_time(@options[:id])
    
     
      finally
      "شما پذیرفتید"
      
    end
    def reject(o,child_self=GodDungeonChoke)
      
    #  Notification.new({to: @options[:user],message: notif,auth:"BetSomethingBetter#reject"},:commit)
        Game::EventList.delete @id
        Database::close_event @id
        Game::Player.players[@options[:user]].remove_task @id
        child_self.waiting.delete @options[:user]
        finally
       "بسیار رٍءوف و دلرحمید! آن زال جادو همی کند و خاک به سر شوید"
    end
    def finally 
      #Game::Player.players[@options[:user]].remove_task @id
      GodDungeonChoke.waiting.delete @options[:user]
      Game::EventList.delete @id
      Database::close_event(@id)
      Database.update_time(@options[:id])
       
    end
  

    
  end
end
