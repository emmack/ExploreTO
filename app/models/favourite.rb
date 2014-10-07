class Favourite < ActiveRecord::Base
  acts_as_taggable
  scope :by_join_date, order("created_at DESC")

  belongs_to :user
  belongs_to :data_set
end
