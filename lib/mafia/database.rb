require 'mongo'
module Database
def self.mongo_connect
Mongo::Logger.logger.level = Logger::FATAL
$client=Mongo::Client.new(['127.0.0.1:27017'],database: 'mafia');
$db=$client.database
end

self.mongo_connect

def self.test_db
puts $db.collection_names
query=$client[:players].find name:"Hanna",pwd:"1234"
puts query
puts query.count()
end

def self.populate
$client[:players].find.each do |doc|
Game::Player.new(doc)
end
end

def self.clean
  $client[:events].delete_many({})
  $client[:groups].update_many({},{"$set":{groups: []}})
  $client[:groups].update_many({},{"$set":{members: []}})
  $client[:players].update_many({},{"$set":{groups: []}})
end
def self.load_open_events
  $client[:events].find({closed: false}).each do |doc|
    
    puts "open event"
    puts doc 
    Game::EventHash[doc[:hash]].new(doc,:remember)
  end
 # puts "LOAD OPEN EVENTS "+Game::EventList.size.to_s
 # puts "time_stamp: "+Game::EventList.keys.to_s
  #puts Game::EventList
end

def self.put_event(o={})
  puts "Database: "+o.to_s
  #res=$client[:events].insert_one(o)
  puts "res "+res.to_s
end

def self.events_later_than(time)
  o={"last_update":{"$gte": time}}
  events=[]
#  puts "querry time: "+ time.to_s
  $client[:events].find(o).each do |doc|
    events << doc
 #   puts "item time: "+doc[:last_update].to_s
  end
events
end

def self.close_event(id)
  $client[:events].update_one({id: id},{"$set": {closed: true}})
end
def self.update_time(id)
   $client[:events].update_one({id: id},{"$set": {last_update: Time.now}})
end
def self.update_status(id,stat)
   $client[:events].update_one({id: id},{"$set": {status: stat.to_s}})
end
end
