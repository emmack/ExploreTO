class CreateTorontoCt2011s < ActiveRecord::Migration
	def change
		create_table :toronto_ct2011s do |t|
			t.timestamps
		end
	end
end
