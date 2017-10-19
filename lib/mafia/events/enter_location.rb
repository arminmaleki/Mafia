# coding: utf-8
module Game
  class EnterLocation < Announce
    def self.requirements; { user:"user", location: "location"} ; end
    def self.stateless; false; end
    def self.hash; "enterLocation"; end
    def self.visible(o); [":all"]; end
    Game::EventHash[self.hash]=self
    Id=[]
    def initialize(o,commit,child_self=EnterLocation)
      o[:message]=o[:user]
      o[:message]+= " رفت  "
      o[:message]+=Game::Locations::LocationHash[o[:location].to_sym][:name]
      
      super(o,commit,child_self)
      
      @mod=Game::Locations::LocationHash[o[:location].to_sym][:mod]
      @mod.user_enters @options,commit
      id={id: @options[:id],user: @options[:user],location: @options[:location]}
      Id << id
      puts "Module is #{@mod}"
    end
    def self.get_out ( o)
      $log.debug(" #{__FILE__}{#__LINE__} #{o}")
      message={}
      Id.each do |login|
        if (login[:user]==o[:info][:user] and login[:location]==o[:info][:location]) then
          $log.debug(" #{__FILE__} #{__LINE__} id is : #{login[:id]}")
          message=EventList[login[:id]].get_out (o)
        end
      end
      message
    end
    def get_out (o)
      $log.debug(" #{__FILE__} #{__LINE__} got out!")
      message=@mod.user_exits @options, :commit
      if ( not message[:ok]) then; return message; end
      index=-1
      Id.each_with_index do |login,i|
        if (login[:id]==@options[:id]) then; index= i ; $log.debug("#{login} deleted #{Id[index]}") end
        Id.delete_at index
        $log.debug("#{__LINE__} Id: #{Id}")
      end
      finally
      message
    end
     def finally
      
      Game::EventList.delete @id
      Database::close_event(@id)
       Database.update_time(@options[:id])
    end
    def by_god iter
      @mod.by_god iter,@options
    end
    def self.condition(o,child_self=EnterLocation)
      o[:message]=""
      unless (Game::Locations::LocationHash.key? o[:location].to_sym) then
        return {ok: false, code: -1, message:"پاتوق وجود ندارد"}
      end
      mod=Game::Locations::LocationHash[o[:location].to_sym][:mod]
      cond=mod.condition(o)
      unless (cond[:ok]) then
        return cond
      end
        Announce.condition(o,child_self)
    end
  end
end
