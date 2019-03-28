class Area < ApplicationRecord
  validates :address, { presence: true }
  validates :status, { presence: true }
  enum status: { 喫煙所:1, レストラン:2, コンビニ:3, 駅:4, カフェ:5 }
end
