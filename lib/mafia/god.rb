module Game
  module God
    module Login
      def self.prune_users
        time=Time.new
        kill_list=[]
        Game::Login.by_user.keys.each do |user|
          if (time-Game::Login.by_user[user].last_check_time > Max_Wait) then
            kill_list << user
          end
        end
        kill_list.each do |user|
          Game::Login.by_user.delete(user)
          $log.debug("#{__FILE__} , #{__LINE__} user #{user} logged out")
        end
      end
    end
    
    def self.every_second iter
      Login.prune_users
      list=EventList.clone
      
      list.each do |id,event|
        if event.respond_to? :by_god then
          event.by_god iter
        end

      end
      if iter%10 ==0 then
        puts "Finding Job!"
        JobEvents.each do |job|
          if job.respond_to? :god_likelyhood then
            puts "#{job} responded"
            Player.players.each do |user,player|
              luck=Random.rand 100
              puts "#{user} chance is #{job.god_likelyhood(player)}"
              if (luck > 100-job.god_likelyhood(player)) and not(job.waiting.include? user) then
                puts "assigned!"
                job.new({user: user},:commit)
              end
            end
            
          end
        end
      end

      
      
    end
  end
end
