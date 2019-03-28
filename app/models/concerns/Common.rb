module Common
  extend ActiveSupport::Concern
  
  def free_user_info(areas, la, lo, ad, cm, st)
    areas.each do |area|
      la.push(area.latitude)
      lo.push(area.longitude)
      ad.push(area.address)
      cm.push(area.comment)
      st.push(area.status)
    end
  end

  def login_user_info
    @login_areas.each do |area|
        @login_areas_lat.push(area.latitude)
        @login_areas_log.push(area.longitude)
        @login_areas_address.push(area.address)
        @login_areas_comment.push(area.comment)
        @login_areas_status.push(area.status)
    end
  end
end