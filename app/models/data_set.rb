class DataSet < ActiveRecord::Base

  validates :file, presence: true

  has_many :favourites
end
