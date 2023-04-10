class CreateMembers < ActiveRecord::Migration[6.0]
  def change
    create_table :members do |t|
      t.references :lounge, null: false, foreign_key: true
      t.string :name, null: false
      t.boolean :attendance, null: false
      t.timestamps
    end
  end
end
