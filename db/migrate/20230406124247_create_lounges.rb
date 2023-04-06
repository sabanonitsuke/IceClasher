class CreateLounges < ActiveRecord::Migration[6.0]
  def change
    create_table :lounges do |t|

      t.timestamps
    end
  end
end
