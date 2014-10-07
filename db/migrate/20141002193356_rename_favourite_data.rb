class RenameFavouriteData < ActiveRecord::Migration
  def self.up
    rename_table :favourite_data, :favourites
  end

  def self.down
    rename_table :favourites, :favourite_data
  end
end
