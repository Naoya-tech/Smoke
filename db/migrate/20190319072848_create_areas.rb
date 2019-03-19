class CreateAreas < ActiveRecord::Migration[5.2]
  def change
    create_table :areas do |t|
      t.string :address
      t.float :latitude
      t.float :longitude
      t.text :comment

      t.timestamps
    end
  end
end
