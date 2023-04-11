class Lounge < ApplicationRecord
  validates :name, presence: true
  validates :password_digest, presence: true
  validates :time_limit, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1 }
  validates :password, format: { with: /\A[ぁ-んァ-ヶ一-龥々ーa-z\d]{6,}\z/i, message: "は6文字以上で入力してください" }

  has_secure_password

  has_many :members
  has_many :topics
  belongs_to :user
end
