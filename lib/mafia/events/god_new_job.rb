# coding: utf-8
module Game
  class GodNewJob < Event
    def self.requirements; [user: 'user'] end
    def self.stateless; false; end
    def self.hash; "godNewjob"; end
    def self.visible(o); []; end
    def self.job_description; "";end
    def self.job_name; "";end
     def self.job_salary; 0; end
    def self.job_time; 0; end
    def self.job_rep; 0; end
     def self.job_firability; 100; end
    Game::EventHash[self.hash]=self
    def initialize(o,commit,child_self=GodNewJob)
      o[:accepted]="not yet"
      $log.debug("#{__FILE__} , #{__LINE__} initialized GodNewJob")
      super(o,commit,child_self)
      message=""
      message+=child_self.job_name
      message+="<br>" + child_self.job_description
      message+="<br>"
      message+="آیا این شغل را قبول می کنید؟"
      Game::Player.players[o[:user]]
        .add_task @id,{id: @id,name: "binary",message: message}
      
      
    end

    def self.condition(o,child_self=GodNewJob)
      cond=Event.condition(o,child_self)
      
      cond
    end
    def accept(o,child_self=GodNewJob)
      if  (Player.players[@options[:user]].resources[:job]!="unemployed" or
           Player.players[@options[:user]].resources[:freetime]<child_self.job_time)then
        return "شما وقت ندارید. سرتان را خلوت کنید یا استعفا دهید و باز تلاش کنید"
      end
      #puts child_self.job_name
      notif="شما در "
      notif+="<span class='user_span'>"+ child_self.job_name+"</span>"
      notif+="استخدام شدید"
    
      Notification.new({to: @options[:user],message: notif,auth:"GodNewJob#accept"},:commit)
      announce="<span class='user_span'>#{@options[:user]}</span> "
      announce+= "در"
      announce+= "<span class='user_span'>"+ child_self.job_name+"</span>"
      announce+="استخدام شد"
      Announce.new({message: announce,visible:[":all"]},:commit)
      Player.players[@options[:user]].resources[:job]=child_self.hash
      Player.players[@options[:user]].resources[:job_farsi]="شاغل در"+child_self.job_name
      @options[:accepted]="yes"
      Game::Player.players[@options[:user]].remove_task @id
      Database.update_time(@options[:id])
      Player.players[@options[:user]].resources[:freetime]-=child_self.job_time
       Player.players[@options[:user]].resources[:reputation]+=child_self.job_rep
      "شما پذیرفتید"
      
    end
    def reject(o,child_self=GodNewJob)
      
    #  Notification.new({to: @options[:user],message: notif,auth:"BetSomethingBetter#reject"},:commit)
        Game::EventList.delete @id
        Database::close_event @id
         Game::Player.players[@options[:user]].remove_task @id
        "شما نپذیرفتید"
    end
    def finally
      Game::Player.players[@options[:user]].remove_task @id
      #Game::EventList.delete @id
      #Database::close_event(@id)
      Database.update_time(@options[:id])
       
    end
    def you_are_fired child_self=GodNewJob
       
      notif="شما از "
      notif+= "<span class='user_span'>"+ child_self.job_name+"</span>"
      notif+= " اخراج شدید."
      Notification.new({to: @options[:user],message: notif,auth:"BetSomethingBetter#you_are_fired"},:commit)
        announce="<span class='user_span'>#{@options[:user]}</span> "
       announce+=" از "
      announce+= "<span class='user_span'>"+ child_self.job_name+"</span>"
      announce+= " اخراج شد."
     puts announce
      Announce.new({message: announce,visible:[":all"]},:commit)
      Player.players[@options[:user]].resources[:job]="unemployed"
      Player.players[@options[:user]].resources[:job_farsi]="بیکار"
       Player.players[@options[:user]].resources[:freetime]+=child_self.job_time
       Player.players[@options[:user]].resources[:reputation]-=child_self.job_rep
      Game::EventList.delete @id
      Database::close_event @id
    end
    def by_god iter,child_self=GodNewJob
      if @options[:accepted]!="yes" then return end
      if (iter%10)==0 then
        puts "#{options[:user]} earns"
        Player.players[@options[:user]].resources[:money]+=child_self.job_salary
        if (Random.rand(100)<child_self.job_firability) then you_are_fired end
      end
    end


    
  end
end
