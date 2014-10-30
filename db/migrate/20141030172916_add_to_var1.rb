class AddToVar1 < ActiveRecord::Migration
  def change
  	add_column :var1s, :name, :string
  end
end
