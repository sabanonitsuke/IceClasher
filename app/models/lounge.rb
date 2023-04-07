class Lounge < ApplicationRecord
  validates :name, presence: true
  validates :password_digest, presence: true

  
end
