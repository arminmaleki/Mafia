# coding: utf-8
module Game
  class MessageToGroup < Announce 
    def self.requirements; { message:"string",  group: "group"} ; end
    def self.stateless; true; end
    def self.hash; "messageToGroup"; end
    def self.visible(o); o[:group]; end
    Game::EventHash[self.hash]=self
    def initialize(o,commit,child_self=MessageToGroup)
      o[:message]= "<span class='user_span'>" +o[:author] +":  </span> <span>"+o[:message]+"</span>"
 
      super(o,commit,child_self)
    end
    def self.condition(o,child_self=MessageToGroup)
      message=Announce.condition(o,child_self)
      if not message[:ok] then return message end
      if not Groups.is_member(Player.players[o[:author]],o[:group]) then
        message[:ok]=false
        message[:code]=-2
        message[:message]="اجازه ندارید"
        return message
      end
      message
    end
  end
end
