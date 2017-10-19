# coding: utf-8
module Game
class BetSomethingBetter <BetSomething
   def self.hash; "betSomethingBetter"; end
   Game::EventHash[self.hash]=self
   def self.message_noresource_you
     "شما این میزان پول ندارید. نا موفق "
   end
   def self.message_noresource(q="")
     message="وی این میزان پول ندارد. نا موفق"
   end
    def initialize(o,commit,child_self=BetSomethingBetter)
      o[:status]="در انتظار پاسخ"
     o[:status]+= "<span class='user_span'> #{o[:b]} </span>"
      super(o,commit,child_self)
      
    end
    def self.condition(o,child_self=BetSomethingBetter)
      cond=Event.condition(o,child_self)
      unless (cond[:ok]) then ; return cond; end
      thing=o[:thing].to_i
      if (Game::Player.players[o[:a]].resources[child_self.on_what] < thing) then
        cond[:message]=child_self.message_noresource_you
        cond[:ok]=false
        cond[:code]=-1

      end
       if (Game::Player.players[o[:b]].resources[child_self.on_what] < thing) then
        cond[:message]=child_self.message_noresource(o[:b])
        cond[:ok]=false
        cond[:code]=-1

      end
      cond
    end
    def self.message_win_a(thing,b)
      message="شما "
      message+=thing.to_s
      message+="تومان از"
      message+=b.to_s
      message+=" بردید"
        
    end
     def self.message_lose_a(thing,b)
      message="شما "
      message+=thing.to_s
      message+="تومان به"
      message+=b.to_s
      message+=" باختید"
        
     end
     def self.message_status_update(q)
       message="<span class='user_span'> #{q.to_s} </span>"
       message+="برد"
     end
     def self.message_status_reject(q)
     end
    def accept o,child_self=BetSomethingBetter
      message=super o,child_self
      if (message[:code]==:a) then
        notif=child_self.message_win_a @options[:thing],@options[:b]
      else
        notif=child_self.message_lose_a  @options[:thing],@options[:b]
      end
     
      Notification.new({to: @options[:a],message: notif,auth:"BetSomethingBetter#accept"},:commit)
      
     
      Database.update_status(@options[:id],"پذیرفتنه شد. "+child_self.message_status_update(@options[message[:code]]))
      message[:text]
    end
    def reject o,child_self=BetSomethingBetter
      message=super o,child_self
       Database.update_status(@options[:id],"رد شد. ")
      message
    end
    def self.message_status_timeout b,fine
      
      message= "بیش از زمان مجاز گذشت."
     
     
       message+=b.to_s
        
      message+="ِ"+fine.to_s
      message+=" "
      message+="تومان جریمه شد."
      puts message
      message
    end
    def by_god(iter,child_self=BetSomethingBetter)
      if iter%10 == 0 then
        $log.debug("#{__FILE__} , #{__LINE__} BetSomethingBetter by god iter: #{iter}")
        if (Time.now-Time.parse(@options[:time_stamp].to_s) > 30) then
          reject @options
          message=child_self.message_status_timeout @options[:b].to_s,child_self.fine.to_s
          Database.update_status(@options[:id],message)
          
        end
      end
    end
  end
end
