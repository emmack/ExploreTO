class RemoveDataSetFromFavourites < ActiveRecord::Migration
  def change
    remove_column :favourites, :data_set_id

    add_column :favourites, :photo, :string
  end
end
