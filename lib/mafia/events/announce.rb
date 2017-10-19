module Game
  class Announce < Event
    def self.requirements; { message:"string",  visible: "group"} ; end
    def self.stateless; true; end
    def self.hash; "announce"; end
    def self.visible(o); o[:visible]; end
    Game::EventHash[self.hash]=self
    def initialize(o,commit,child_self=Announce)
      super(o,commit,child_self)
    end
    def self.condition(o,child_self=Announce)
      Event.condition(o,child_self)
    end
  end
end
