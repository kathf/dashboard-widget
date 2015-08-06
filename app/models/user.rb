class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :authentication_keys => [:name]
        # , :registerable, :recoverable, :rememberable, :trackable, :validatable

  has_many :organizations

  def email_required?
    false
  end

end
