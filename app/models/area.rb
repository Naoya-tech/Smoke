class Area < ApplicationRecord
  enum status: { 喫煙所:1, レストラン:2, コンビニ:3, 駅:4 }
end
