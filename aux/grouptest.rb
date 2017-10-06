require 'mongo'
require 'json'
require 'time'
require 'logger'

$log=Logger.new('mafia.log')

load '../modules/game.rb'
load '../modules/database.rb'
load '../modules/groups.rb'
#Database.test_db
Database.populate
puts " is armin a member of :lovers? #{Groups.is_member(Game::Player.players["armin"],:lovers)}"
puts " is armin a member of :all? #{Groups.is_member(Game::Player.players["armin"],:all)}"
puts " is armin a member of [armin,hanna]? #{Groups.is_member(Game::Player.players["armin"],["armin","hanna"])}"
puts " is simin a member of :hame? #{Groups.is_member(Game::Player.players["simin"],:hame)}"
puts " is simin a member of :lovers? #{Groups.is_member(Game::Player.players["simin"],:lovers)}"

puts "members of :lovers #{Groups.all_members(:lovers)}"
puts "members of :hame #{Groups.all_members(:hame)}"

Groups.add_member(:casino,:lovers)
puts "members of :casino #{Groups.all_members(:casino)}"
Groups.remove_member(:casino,:lovers)
Groups.add_member(:casino,"armin")
puts "members of :casino #{Groups.all_members(:casino)}"
