class AddLoggedInToAreas < ActiveRecord::Migration[5.2]
  def change
    add_column :areas, :logged_in, :boolean, default: false, null: false
  end
end
