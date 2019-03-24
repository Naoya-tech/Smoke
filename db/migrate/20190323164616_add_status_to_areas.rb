class AddStatusToAreas < ActiveRecord::Migration[5.2]
  def change
    add_column :areas, :status, :integer
  end
end
