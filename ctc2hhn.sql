--select * from Sites

Declare @ctc as UNIQUEIDENTIFIER
set @ctc = '668EF11B-98E9-4A16-B3D9-A3985ED01D8A'
print @ctc

Declare @hnn as UNIQUEIDENTIFIER
set @hnn = '762714FD-2D68-4A55-A063-3EC5A260BF76'
print @hnn

--update Specialties set SiteId = @hnn where SiteId = @ctc and Id <> 'id của TKCM'
--update Translations set SiteId = @hnn where SiteId = @ctc

--update EDs set SiteId = @hnn where SiteId = @ctc
--update OPDs set SiteId = @hnn where SiteId = @ctc
--update IPDs set SiteId = @hnn where SiteId = @ctc
--update EOCs set SiteId = @hnn where SiteId = @ctc

--update EOCTransfers set SiteId = @hnn where SiteId = @ctc
--update Rooms set SiteId = @hnn where SiteId = @ctc

--update users set CurrentSiteId = @hnn, [Session] = null, SessionId = null  where CurrentSiteId = @ctc
