class CreateLounges < ActiveRecord::Migration[6.0]
  def change
    create_table :lounges do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name
      t.integer :time_limit, null:false
      t.string :password_digest, null: false
      t.timestamps
    end
  end
end
