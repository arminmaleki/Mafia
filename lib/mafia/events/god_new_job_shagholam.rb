# coding: utf-8
module Game
  class GodNewJobShagholam < GodNewJob
    def self.requirements; [user: 'user'] end
    def self.hash; "godNewJobShagholam"; end
    Game::EventHash[self.hash]=self
    Game::JobEvents << self
    class <<self
      attr_accessor :waiting
    end
    self.waiting=[]
    def self.god_likelyhood player,child_self=GodNewJobShagholam
      if player.resources[:job]=="unemployed" then
        return 40
      else
        otherjob=EventHash[player.resources[:job]].job_level
        if (child_self.job_level>otherjob) then; return 30; else; return 0; end
      end
      
    end
    
    def self.job_name;"کافه شاغلام";end
    def self.job_description
      desc="<img src='img/sibil2.jpg' style='width:100px; margin:15px; position:relative; float:left;margin-top:0px;'></img>"+
           "کافه شاغلام یک غلغلی عادی است. صورت خوشی ندارد ولی دستمزدش از اماکن فرهنگی بالاتر است. وقت زیادی باید صرف کنید."
          
      desc
    end
    def self.job_level; 5; end
    def self.job_salary; 5; end
    def self.job_time; 65; end
    def self.job_rep; -10; end
    def self.job_firability; 8; end
    
    def initialize(o,commit,child_self=GodNewJobShagholam)
         $log.debug("#{__FILE__} , #{__LINE__} initialized GodNewJobShagholam")
         super(o,commit,child_self)
         child_self.waiting << @options[:user]

    end

    def self.condition(o,child_self=GodNewJobShagholam)
      cond=GodNewJob.condition(o,child_self)
      
      cond
    end
    def accept o, child_self=GodNewJobShagholam
     
      super o, child_self
      
    end
    def reject o, child_self=GodNewJobShagholam
      
      super o, child_self
     end
    def you_are_fired child_self=GodNewJobShagholam
      super  child_self
    end
     def by_god iter,child_self=GodNewJobShagholam
      super  iter,child_self
     end
  end
end
