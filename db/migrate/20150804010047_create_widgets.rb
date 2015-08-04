class CreateWidgets < ActiveRecord::Migration
  def change
    create_table :widgets do |t|
      t.string :name
      t.string :engine
      t.string :metadata_entity, array: true, default: []
      t.timestamps null: false
    end
  end
end
