class CreateOrganizations < ActiveRecord::Migration
  def change
    create_table :organizations do |t|
      t.references :user
      t.string :name
      t.string :api_id
      t.timestamps null: false
    end
  end
end
