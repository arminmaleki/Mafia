# coding: utf-8
require 'mongo'
require 'json'
require 'time'
require 'sinatra'
require 'logger'

$log=Logger.new('mafia.log')

load 'modules/game.rb'
load 'modules/database.rb'
#Database.test_db
Database.populate
Database.load_open_events
#puts Game::Player.players;
#puts Game::Player.players["armin"]
o={b:'armin',a:'hanna',thing:'10'}
#puts Game::BetSomething.condition(o)
#Game::BetSomething.new(o,:commit)
#Game::SaySomething.new(o)
#Game::EventHash["saySomething"].new(o)
#puts Game::Player.players["armin"].info
#t=Time.parse( "2017-09-27 04:24:14")
#puts t
#puts Database.events_later_than(t)
#puts Database.events_later_than(Time.now)

o={to:'armin',message:'دالللیییی',auth:'God'}
Game::Notification.new(o,:commit)
$log.debug("#{__FILE__} , #{__LINE__} total open events: #{Game::EventList.size}");
def start_God
  iter=0
 
  
    loop do
      iter+=1
    
    Game::God.every_second iter
    sleep 1
    
    end

end
load 'modules/server.rb'
Thread.abort_on_exception=true
Thread.new do
start_God
end
