class Area < ApplicationRecord
  enum status: [ :"喫煙所", :"レストラン", :"コンビニ", :"駅" ]
end
