# coding: utf-8
module Game
class SaySomething < Event
     def self.requirements; {a: 'user',b: 'user', thing: 'string'}; end
    def self.stateless; true; end
    def self.hash; "saySomething"; end
    def self.visible(o); [o[:a],o[:b]]; end
    Game::EventHash[self.hash]=self
    def initialize(o,commit,child_self=SaySomething)
      
      $log.debug("#{__FILE__} , #{__LINE__} initialized SaySomething")
      super(o,commit,child_self)
    end
    def self.condition(o,child_self=SaySomething)
      cond=Event.condition(o,child_self)
      unless (cond[:ok]) then ; return cond; end
      unless o[:author]=o[:a] or o[:author]="God" then
        $log.debug("#{__FILE__} , #{__LINE__} #{child_self.hash} not authorized")
        return {ok: false, code: -1, message: "شما اجازه ی این کار را ندارید"}
      end
      cond
    end
  end
end
