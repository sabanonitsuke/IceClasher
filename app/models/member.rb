class Member < ApplicationRecord
  validates :name, presence: true
  validates :attendance, presence: true
  belongs_to :lounge
end
