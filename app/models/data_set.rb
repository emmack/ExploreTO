class DataSet < ActiveRecord::Base

  validates :file, presence: true

  has_and_belongs_to_many :users
end
