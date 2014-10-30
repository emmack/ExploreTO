class AddToGraphs < ActiveRecord::Migration
  def change
  	add_column :graphs, :var1_id, :integer
  	add_column :graphs, :var2_id, :integer
  end
end
