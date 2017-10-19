module Groups
  def self.is_member(player,group)
    if (group==:all and Game::Player.players.key? player.user) then; return true; end
    if (group.class==Symbol) then
      res=$client[:groups].find({name: ":"+group.to_s})
      if (res.count == 0) then
        puts "group #{group} not found"
        return false
      end
       return is_member(player,res.first[:members])
     
    end
    if (group.class==Array) then
      group.each do |member|
        if (member.class==Symbol) then
          if (is_member(player,member)) then; return true; end
        end
        if (member[0] == ":") then
          if (is_member(player,member)) then; return true; end 
        else
          if (player.respond_to? :user) then
               if (member == player.user) then; return true; end
          end
        end
      end
    end
    if (group.class==String) then
      
      if (group[0]=":" ) then
        if ((player==group) or ((":"+player.to_s)==group)) then; return true; end
        return is_member(player,group[1..-1].to_sym)
      else
        return false
      end
    end
      false
  end

  def self.all_members(group)
    members=[]
    if (group.class==Symbol) then
      query=":"+group.to_s
      else
      query=group
    end
    res=$client[:groups].find({name: query})
     if res.count==0 then return members end
    res.first[:members].each do |member|
        if (member[0]==":") then
        all_members(member).each do |member2|
          members.push(member2)
        end
      else
        members.push(member)
           end
    end
    members
  end
  def self.add_member(group,player)
     if (group.class==Symbol) then
      query=":"+group.to_s
      else
      query=group
     end
     player_q=player
     if player.class== Game::Player then; player_q=player.user; end
     if player.class== Symbol then
       player_q=":"+player.to_s
     end
     if player.class== Symbol or (player.class== String and player[0]==":") then
       res=$client[:groups].find({name: player_q})
       if (res.count==0) then; puts "lesser group not found"; return false; end
       groups=res.first[:groups]
       groups << query # query is qualified group name
       groups.uniq!
       res=$client[:groups].update_one({name: player_q},{"$set": {groups: groups}})
     else
       res=$client[:players].find({user: player_q})
       if (res.count==0) then; puts "player not found"; return false; end
       groups=res.first[:groups]
       groups << query # query is qualified group name
       groups.uniq!
       res=$client[:players].update_one({user: player_q},{"$set": {groups: groups}})
 
     end
     #if (player.class==String and player[0]!=":" )
     puts "putting member #{player_q} in group #{group}"
     res=$client[:groups].find({name: query})
     if (res.count==0) then;return false;end
     members=res.first[:members]
     #puts "members first:"+members.to_s
     if not members.include? player_q then
       members.push player_q
       #puts "members"+members.to_s
       $client[:groups].update_one({name: query},{"$set":{members: members}})
     end
     #res=$client[:players].find({user: player_q})
     #if res.count==0 then; puts "player not found"; return false; end
  end

  def self.remove_member(group,player)
      if (group.class==Symbol) then
      query=":"+group.to_s
      else
      query=group
     end
     player_q=player
     if player.class== Game::Player then; player_q=player.user; end
     if player.class== Symbol then
       player_q=":"+player.to_s
     end
     if player.class!= Game::Player and not (player.class==String and player[0]!=":") then
       res=$client[:groups].find({name: player_q})
       if (res.count==0) then; puts "lesser group not found"; return false; end
       groups=res.first[:groups]
       groups.delete query # query is qualified group name
       #groups.uniq!
       res=$client[:groups].update_one({name: player_q},{"$set": {groups: groups}})
     else
        res=$client[:players].find({user: player_q})
       if (res.count==0) then; puts "player not found"; return false; end
       groups=res.first[:groups]
       groups.delete query # query is qualified group name
       #groups.uniq!
       res=$client[:players].update_one({user: player_q},{"$set": {groups: groups}})

     end
      res=$client[:groups].find({name: query})
     if (res.count==0) then;return false;end
     members=res.first[:members]
     #puts "members first:"+members.to_s
     if  members.include? player_q then
       members.delete(player_q)
         $client[:groups].update_one({name: query},{"$set":{members: members}})
     end
     
  end
  def self.all_groups obj
    if (obj.class==Game::Player or (obj.class==String and obj[0]!=":")) then
      if (obj.class==Game::Player) then; user=obj.user else user=obj end
      puts user
      obj_str=user
      res=$client[:players].find({user: user})
      if (res.count==0) then; return []; end
      groups= res.first['groups']
      
    else
    obj_str=obj
    if (obj.class == Symbol) then ; obj_str=":"+obj.to_s end;
    res=$client[:groups].find({name: obj_str})
    if (res.count==0) then; return []; end
    groups=res.first['groups']
    end
    all=groups
    groups.each do |group|
      all += self.all_groups group
      all.uniq!
    end
    puts "All groups : " + obj_str
    puts all
    all
                          
  end
end
