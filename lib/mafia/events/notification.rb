# coding: utf-8
module Game
class Notification < Event
     def self.requirements; {to: "user",message: "string",auth: "string"} end
    def self.stateless; false; end
      def self.hash; "notification"; end
      Game::EventHash[self.hash]=self
        def initialize(o,commit,child_self=Notification)
      
     
      super(o,commit,child_self)
      Game::Player.players[o[:to]].add_task @id,{id: @id,name: child_self.hash,stage: 0, auth: o[:auth], message: o[:message]}
        end
         def self.condition(o,child_self=Notification)
          cond=Event.condition(o,child_self)
          unless (cond[:ok]) then ; return cond; end
          cond
         end
         def seen o
           finally
           message="متشکرم"
           message
         end
          def finally
      Game::Player.players[@options[:to]].remove_task @id
      Game::EventList.delete @id
      Database::close_event(@id)
    end
  end
end
