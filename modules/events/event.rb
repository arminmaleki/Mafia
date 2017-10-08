# coding: utf-8
module Game
class Event
    def self.requirements; {}; end
    def self.optionals; {}; end
    def self.stateless; false; end
    def self.hash; "default"; end
    attr_reader :options,:id;
    
    def self.condition(o,child_self=Event)
      unless all_keys?(o,child_self) then
        return {ok: false,code: -1, message: "اطلاعات غلط. عدم موفقیت"} end
      {ok: true,code: 1,message: "موفقیت آمیز"}
    end
    def initialize(o,commit,child_self=Event)
      @options=o;
      #@@event_list.push(self) unless @@stateless
      
      
      if (commit == :commit) then
        @id=SecureRandom.base64
        o[:hash]=child_self.hash
        $log.debug("#{__FILE__} , #{__LINE__} initialize Event, child_self.hash is #{child_self.hash}")
      o[:time_stamp]=DateTime.parse(Time.new.to_s)
      
      o[:last_update]=o[:time_stamp]
      
      o[:closed]= child_self.stateless
      o[:id]=@id
      #if (not @@stateless) then Database.put_event(o) end
   #   puts "putting "+child_self.hash+" in data-base "+o.to_s
      res=$client[:events].insert_one(o)
      else
        @id=o[:id]
      end
      @time_stamp=o[:time_stamp]
      @last_update=o[:last_update]
      Game::EventList[@id]=self unless child_self.stateless
    end
    def self.all_keys?(o,child_self)
       all_parameters=true
       child_self.requirements.keys.each do |key|
        puts key
        unless o.key?(key) then
          all_parameters=false
          puts "Event not valid:no parameter "+key.to_s
          break
        end
        if (child_self.requirements[key]=='user' and not Game::Player.players.key?(o[key])) then
          all_parameters=false
          puts "Event not valid: parameter is not a valid user "+key.to_s
          break
        end
      end
    
      all_parameters
    end
  end
end
