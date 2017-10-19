Gem::Specification.new do |s|
  s.name        = 'mafia'
  s.version     = '0.0.0'
  s.date        = '2017-10-18'
  s.summary     = "Mafia first time packaged as Gem"
  s.description = "GURP like web-game"
  s.authors     = ["Armin Maleki"]
  s.email       = 'dasein68@gmail.com'
  s.files       = ["lib/mafia.rb","lib/mafia/database.rb"
                   ,"lib/mafia/game.rb"
                   ,"lib/mafia/groups.rb"
                   ,"lib/mafia/server.rb"
                   ,"lib/mafia/events/announce.rb"
                   ,"lib/mafia/events/bet_something_better.rb"
                   ,"lib/mafia/events/bet_something.rb"
                   ,"lib/mafia/events/enter_location.rb"
                   ,"lib/mafia/events/event.rb"
                   ,"lib/mafia/events/message_to_group.rb"
                   ,"lib/mafia/events/notification.rb"
                   ,"lib/mafia/events/say_something.rb"
                   ,"lib/mafia/locations/casino.rb"
                  ]
  s.homepage    =
    'http://www.proto-plasm.com'
  s.license       = 'MIT'
end
