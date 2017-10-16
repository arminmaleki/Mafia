require 'mongo'
require_relative '../modules/groups.rb'
require 'test/unit'
require '../modules/database.rb'
require '../modules/game.rb'
Database.populate

#puts "here it begins"
class GroupTest < Test::Unit::TestCase
  def setup
    #puts "setup"
    #puts $client.database.collection_names
    res=$client[:groups].insert_one({name: ":test1", members: [] ,groups: []})
    res=$client[:groups].insert_one({name: ":test2", members: [] ,groups: []})
    res=$client[:groups].insert_one({name: ":test0", members: [] ,groups: []})
  end
  def teardown
    res=$client[:groups].delete_one({name:":test1"})
    res=$client[:groups].delete_one({name:":test2"})
    res=$client[:groups].delete_one({name:":test0"})
    res=$client[:players].update_one({user:"armin"},{"$set": {groups: []}})
    
    #puts "teardown"
  end
  def test_test
    #puts "test_test"
    assert_equal( 2*2 , 4 , " 2*2 != 4")
    Groups.add_member(:test1,"armin")
    assert_equal(Groups.is_member(Game::Player.players['armin'],:test1),true," armin added to :test1 but is not there!")
    Groups.add_member(:test2,:test1)
    assert_equal(Groups.is_member(:test1,:test2),true," :test1 added to :test2 but is not there!")
    assert_equal(Groups.is_member(Game::Player.players['armin'],:test2),true," :armin is in test1, test1 is in test2 , armin is not in test1 ! ");

    Groups.add_member(:test1,:test0)
    assert_equal(Groups.is_member(:test0,:test2),true," :test0 is in test1, test1 is in test2 , test0 is not in test1 ! ")
     assert_equal(Groups.all_groups(:test1),[":test2"],"test1 is a subset of test2!")
    assert_equal(Groups.all_groups(:test1).sort,Groups.all_groups(":test1").sort, "symbol==string")
    assert_equal(Groups.all_groups(:test0).sort,[":test2",":test1"].sort,"test0 is a subset of test2 and test1!")
    Groups.remove_member(:test1,:test0)
     assert_equal(Groups.all_groups(:test0).sort,[].sort,"test0 is removed from :test1!")
     Groups.add_member(:test1,:test0)
     assert_equal(Groups.all_groups(Game::Player.players['armin']).sort,[':test1',':test2'].sort,"armin not yet added to any group")
     Groups.add_member(:test0,Game::Player.players['armin'])
     assert_equal(Groups.all_groups(Game::Player.players['armin']).sort,[':test0',':test1',':test2'],"armin E 0 E 1 E 2")
     Groups.remove_member(:test0,Game::Player.players['armin'])
     assert_equal(Groups.all_groups(Game::Player.players['armin']).sort,[':test1',':test2'].sort,"removed from test0")
      assert_equal(Groups.all_groups('armin').sort,[':test1',':test2'].sort,"removed from test0")
      Groups.add_member(':test0','armin')
      assert_equal(Groups.all_groups(Game::Player.players['armin']).sort,[':test1',':test2',':test0'].sort,"added to test0")
      Groups.remove_member(:test0,'armin')
      Groups.remove_member(':test1','armin')
      assert_equal(Groups.all_groups(Game::Player.players['armin']).sort,[],"removed from all")
      
      
                          
    
    
  end
end
