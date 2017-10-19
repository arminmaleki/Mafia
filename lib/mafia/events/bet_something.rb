# coding: utf-8
module Game
class BetSomething < SaySomething
    def self.requirements; o=SaySomething.requirements.clone; o[:thing]="number"; o end
    def self.stateless; false; end
    def self.hash; "betSomething"; end
    def self.visible(o); ":all"; end
     Game::EventHash[self.hash]=self
      def self.message_lose(q) 
      message=" شما"+q.to_s + " تومان باختید"
      message
    end
    def self.message_win(q) 
      message=" شما"+q.to_s + " تومان بردید"
      message
    end
    def self.message_reject(q)
      message= "نپذیرفتید و "+q.to_s+"تومان جریمه شدید"
      message
    end
     def self.fine; 2; end
    def self.on_what; :money ; end
    def initialize(o,commit,child_self=BetSomething)
      super(o,commit,child_self)
       Game::Player.players[o[:b]].add_task @id,{id: @id,name: child_self.hash,stage: 0, a: o[:a], thing: o[:thing].to_i}
    end
    def self.condition(o,child_self=BetSomething)
      cond=Event.condition(o,child_self)
      unless (cond[:ok]) then ; return cond; end
      cond
    end
  
    
    def accept(o,child_self=BetSomething)
      $log.debug("#{__FILE__} , #{__LINE__} BetSomething accept \n #{o[:user]} \n {o[:info]}")
        coin=Random.rand(2)
      if (coin ==1) then
        message=child_self.message_win(@options[:thing].to_s);
        money=@options[:thing].to_i
        winner=:b
        
      else
         message=child_self.message_lose(@options[:thing].to_s);
         money=-@options[:thing].to_i
         winner=:a
      end
      $log.debug("#{__FILE__} , #{__LINE__} WINNER IS : #{winner.to_s} \n message:#{message}")
     # puts  "BetSomething says: "+message.to_s
      Game::Player.players[@options[:b]].resources[child_self.on_what]+=money
      Game::Player.players[@options[:a]].resources[child_self.on_what]-=money
      finally
      if (child_self==BetSomething) then
        return message
      else
        return {code: winner, text: message}
      end
    end
    def reject(o,child_self=BetSomething)
      $log.debug("#{__FILE__} , #{__LINE__} Rejected!")
      Game::Player.players[@options[:b]].resources[child_self.on_what]-=child_self.fine
      Game::Player.players[@options[:a]].resources[child_self.on_what]+=child_self.fine
      finally
      message=child_self.message_reject(child_self.fine)
      message
    end
    def expire(time)
    end
    def finally
      Game::Player.players[@options[:b]].remove_task @id
      Game::EventList.delete @id
      Database::close_event(@id)
       Database.update_time(@options[:id])
    end
  end
end
