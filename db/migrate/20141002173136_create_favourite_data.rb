class CreateFavouriteData < ActiveRecord::Migration
  def change
    create_table :favourite_data do |t|
      t.belongs_to :user
      t.belongs_to :data_set
      t.boolean :downloaded

      t.timestamps
    end
  end
end
