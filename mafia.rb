require 'mongo'
require 'json'
require 'time'
require 'sinatra'

load 'modules/game.rb'
load 'modules/database.rb'
#Database.test_db
Database.populate
Database.load_open_events
#puts Game::Player.players;
#puts Game::Player.players["armin"]
puts ""
puts ""
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


def start_God
Thread.new do
  loop do
    Game::God.every_second
    sleep 1
  end
end
end
start_God
load 'modules/server.rb'
