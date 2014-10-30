class AddToVar2 < ActiveRecord::Migration
  def change
  	add_column :var2s, :name, :string
  end
end
