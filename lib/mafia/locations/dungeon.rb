# coding: utf-8
module Game
  module Locations
    module Dungeon
      Description={name:"تاریکخانه ی اشباح",details:"تشریک مساعی جهت استخدام زورگیر و آدمکش",group: :dungeon,timeout: 60, ticket: 10 ,mod: self, last_update: Time.now }
      # def self.visible; []; end
      Description[:details]="<img src='img/casper1.jpg' style='width:100px; margin:15px; position:relative; float:left;margin-top:0px;'></img>"+
                            Description[:details]
      Description[:details]+="<br>"

      LocationHash[Description[:group]]=Description

        def self.condition o
        if Groups.is_member(Game::Player.players[o[:user]],Description[:group]) then
           $log.debug("#{__FILE__} already inside #{o[:user]} #{Description[:group]}")
          return {ok: false, code: -2, message: "قبلن وارد شده اید" }
        else
          if (Game::Player.players[o[:user]].resources[:money] <30) then
            return {ok: false, code: -3,
                    message: " حد اقل سی تومن تو جیبت نیست؟؟"}
              end
              
          return {ok: true, code: 1, message: "موفقیت آمیز"}
        end
      end
      def self.user_enters options,commit
        $log.debug( " #{__FILE__}#{__LINE__} options #{options} commit #{commit}")
        if (commit==:commit) then ; Groups.add_member(Description[:group],options[:user],);
        end
        Description[:last_update]=Time.now
                    
      end
      def self.user_exits options,commit
        puts "user is exiting"+ options[:user].to_s
        Description[:last_update]=Time.now
        if (Time.new-Time.parse(options[:time_stamp].to_s)<40) then
           return {ok: false, code: -4, message: "به این زودی کجا؟؟"}
        end
        puts "user is exiting"+ options[:user].to_s+Description[:group].to_s
        Groups.remove_member(Description[:group],options[:user])
         return {ok: true, code: 1, message: "موفقیت آمیز"}
      end
      def self.by_god iter, options
        if iter%20 ==0 then
          puts "user #{options[:user]} is inside dungeon"
          luck=Random.rand 1000
          if luck > 1000-500 then
            puts "#{options[:user]} in Dungeon Choking the Pirzan!"
            if (not Game::GodDungeonChoke.waiting.include? options[:user]) then
              Game::GodDungeonChoke.new({user:options[:user]},:commit)
            end
          end
        end
      end
      
    end
  end
end
