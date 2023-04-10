class Lounge < ApplicationRecord
  validates :name, presence: true
  validates :password_digest, presence: true
  validates :time_limit, presence: true
  validates :password, format: { with: /\A[ぁ-んァ-ヶ一-龥々ーa-z\d]{6,}\z/i, message: "は6文字以上で入力してください" }

  has_secure_password

  belongs_to :user
end
