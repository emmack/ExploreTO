class AddFormatToDataSet < ActiveRecord::Migration
  def change
    add_column :data_sets, :format, :string
  end
end
