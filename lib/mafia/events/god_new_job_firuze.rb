# coding: utf-8
module Game
  class GodNewJobFiruze < GodNewJob
    def self.requirements; [user: 'user'] end
    def self.hash; "godNewjobFiruze"; end
    Game::EventHash[self.hash]=self
    def self.job_name; "بنیاد فیروزه ای";end
    def self.job_description
      desc="<img src='img/miki.jpg' style='width:100px; margin:15px; position:relative; float:left;margin-top:0px;'></img>"+
           "بنیاد فیروزه ای یک بنیاد هنری است که به معامله و نمایش آثار وزین هنری  همانند تصویر می پردازد"+
           " به طور معمول استخدام شما در این بنیاد زیاد طول نمی کشد"
          
      desc
    end
    def self.job_salary; 3; end
    def self.job_time; 50; end
    def self.job_rep; 10; end
    def self.job_firability; 20; end
    
    def initialize(o,commit,child_self=GodNewJobFiruze)
         $log.debug("#{__FILE__} , #{__LINE__} initialized GodNewJobFiruze")
      super(o,commit,child_self)

    end

    def self.condition(o,child_self=GodNewJobFiruze)
      cond=GodNewJob.condition(o,child_self)
      
      cond
    end
    def accept o, child_self=GodNewJobFiruze
      super o, child_self
    end
     def reject o, child_self=GodNewJobFiruze
      super o, child_self
     end
    def you_are_fired child_self=GodNewJobFiruze
      super  child_self
    end
     def by_god iter,child_self=GodNewJobFiruze
      super  iter,child_self
     end
  end
end
